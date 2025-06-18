import { create } from "zustand";

interface UserSettingState {
  nickname: string;
  setNickname: (nickname: string) => void;
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
  selectedGu: string | null;
  selectedDong: string | null;
  setSelectedGu: (gu: string | null) => void;
  setSelectedDong: (dong: string | null) => void;
  categories: string[];
  setCategories: (
    categories: string[] | ((prev: string[]) => string[])
  ) => void;
}

export const useUserSettingStore = create<UserSettingState>((set) => ({
  nickname: "",
  setNickname: (nickname) => set({ nickname }),
  profileImage: null,
  setProfileImage: (image) => set({ profileImage: image }),
  selectedGu: "강남구",
  selectedDong: "개포1동",

  setSelectedGu: (gu) =>
    set(() => ({
      selectedGu: gu,
      selectedDong: null,
    })),
  setSelectedDong: (dong) =>
    set(() => ({
      selectedDong: dong,
    })),
  categories: [],
  setCategories: (categories) =>
    set((state) => ({
      categories:
        typeof categories === "function"
          ? categories(state.categories)
          : categories,
    })),
}));
