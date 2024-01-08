import { defineStore } from "pinia";
import skillApi from "../api/skillApi";

interface SkillState {
  idUser: number;
  idRole: number;
  token: string;
  name: string;
}

export const useSkillStore = defineStore("skillStore", {
  state: (): SkillState => ({
    idUser: 0,
    idRole: 0,
    token: "",
    name: "",
  }),

  actions: {
    async getRoles() {
      try {
        const { data } = await skillApi.get("getRoles");

        if (data.type == "negative" || data.type == "warning") {
          return { ok: false, message: data };
        } else {
          return { ok: true, message: data };
        }
      } catch (error) {
        console.log(error);
      }
    },

    async principalQuote() {
      try {
        const { data } = await skillApi.get("principalQuote");

        if (data.type == "negative" || data.type == "warning") {
          return { ok: false, message: data };
        } else {
          return { ok: true, message: data };
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      try {
        const { data } = await skillApi.get("getUsers");

        if (data.type == "negative" || data.type == "warning") {
          return { ok: false, message: data };
        } else {
          return { ok: true, message: data };
        }
      } catch (error) {
        console.log(error);
      }
    },

    async specifiedQuote(qnt: number) {
      try {
        const { data } = await skillApi.get(`specifiedQuote/${qnt}`);

        if (data.type == "negative" || data.type == "warning") {
          return { ok: false, message: data };
        } else {
          return { ok: true, message: data };
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getFavorite() {
      try {
        const { data } = await skillApi.get(`getFavorite/${this.idUser}`);

        if (data.type == "negative" || data.type == "warning") {
          return { ok: false, message: data };
        } else {
          return { ok: true, message: data };
        }
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        this.idUser = 0;
        this.token = "";
        this.name = "";
        this.idRole = 0;

        return { ok: true };
      } catch (error) {
        console.log(error);
      }
    },

    async login(email: string, password: string) {
      try {
        const { data } = await skillApi.post("login", {
          email,
          password,
          returnSecureToken: true,
        });

        this.idUser = data.data.idUser;
        this.token = data.data.token;
        this.name = data.data.name;
        this.idRole = data.data.idRole;

        if (data.type == "negative" || data.type == "warning") {
          return { ok: false, message: data };
        } else {
          return { ok: true, message: data };
        }
      } catch (error) {
        console.log(error);
      }
    },
    async register(
      name: string,
      idRole: number,
      email: string,
      password: string,
      cpassword: string
    ) {
      try {
        const { data } = await skillApi.post("register", {
          name,
          idRole,
          email,
          password,
          cpassword,
        });

        this.idUser = data.data.user.id;
        this.token = data.data.token;
        this.name = data.data.user.name;
        this.idRole = data.data.user.idRole;

        if (data.type == "negative" || data.type == "warning") {
          return { ok: false, message: data };
        } else {
          return { ok: true, message: data };
        }
      } catch (error) {
        console.log(error);
      }
    },

    async banUser(idUser: string) {
      try {
        const { data } = await skillApi.put("banUser", {
          idUser,
        });

        if (data.type == "negative" || data.type == "warning") {
          return { ok: false, message: data };
        } else {
          return { ok: true, message: data };
        }
      } catch (error) {
        console.log(error);
      }
    },
    async unbanUser(idUser: number) {
      try {
        const { data } = await skillApi.put("unbanUser", {
          idUser,
        });

        if (data.type == "negative" || data.type == "warning") {
          return { ok: false, message: data };
        } else {
          return { ok: true, message: data };
        }
      } catch (error) {
        console.log(error);
      }
    },

    async saveFavorite(idUser: string, quote: string) {
      try {
        const { data } = await skillApi.post("saveFavorite", {
          idUser,
          quote,
        });

        if (data.type == "negative" || data.type == "warning") {
          return { ok: false, message: data };
        } else {
          return { ok: true, message: data };
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteFavorite(idQuote: number) {
      try {
        const { data } = await skillApi.delete(`deleteFavorite/${idQuote}`);

        if (data.type == "negative" || data.type == "warning") {
          return { ok: false, message: data };
        } else {
          return { ok: true, message: data };
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
