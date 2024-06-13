import { create } from "zustand";
import { useRouter, useSearchParams } from "next/navigation";

import { useAlertService } from "@/stores/alertStore";
import { useFetch } from "../customHooks/useFetch";

// user state store
const initialState = {
  users: undefined,
  user: undefined,
  currentUser: undefined,
};
const userStore = create<IUserStore>(() => initialState);

export function UserService(): IUserService {
  const alertService = useAlertService();
  const fetch = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { users, user, currentUser } = userStore();

  return {
    users,
    user,
    currentUser,
    login: async (username, password) => {
      alertService.clear();
      try {
        const currentUser = await fetch.post("/api/auth/login", {
          username,
          password,
        });
        userStore.setState({ ...initialState, currentUser });

        const returnUrl = searchParams.get("returnUrl") || "/";
        router.push(returnUrl);
      } catch (error: any) {
        alertService.error(error);
      }
    },
    logout: async () => {
      await fetch.post("/api/auth/logout");
      router.push("/auth/login");
    },
    register: async (user) => {
      try {
        await fetch.post("/api/auth/register", user);
        alertService.success("Registration successful", true);
        router.push("/auth/login");
      } catch (error: any) {
        alertService.error(error);
      }
    },
    getAll: async () => {
      userStore.setState({ users: await fetch.get("/api/users") });
    },
    getById: async (id) => {
      userStore.setState({ user: undefined });
      try {
        userStore.setState({ user: await fetch.get(`/api/users/${id}`) });
      } catch (error: any) {
        alertService.error(error);
      }
    },
    getCurrent: async () => {
      if (!currentUser) {
        userStore.setState({
          currentUser: await fetch.get("/api/users/current"),
        });
      }
    },
    create: async (user) => {
      await fetch.post("/api/users", user);
    },
    update: async (id, params) => {
      await fetch.put(`/api/users/${id}`, params);

      if (id === currentUser?.id) {
        userStore.setState({ currentUser: { ...currentUser, ...params } });
      }
    },
    delete: async (id) => {
      userStore.setState({
        users: users!.map((x) => {
          if (x.id === id) {
            x.isDeleting = true;
          }
          return x;
        }),
      });

      // delete user
      const response = await fetch.delete(`/api/users/${id}`);

      // remove deleted user from state
      userStore.setState({ users: users!.filter((x) => x.id !== id) });

      // logout if the user deleted their own record
      if (response.deletedSelf) {
        router.push("/auth/login");
      }
    },
  };
}

// interfaces

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  isDeleting?: boolean;
}

interface IUserStore {
  users?: IUser[];
  user?: IUser;
  currentUser?: IUser;
}

interface IUserService extends IUserStore {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (user: IUser) => Promise<void>;
  getAll: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  getCurrent: () => Promise<void>;
  create: (user: IUser) => Promise<void>;
  update: (id: string, params: Partial<IUser>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
