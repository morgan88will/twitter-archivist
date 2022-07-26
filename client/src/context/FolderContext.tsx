import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { FOLDERS_PATH } from "../shared/constants";
import AuthContext from "./auth/authContext";
import type { Folder } from "../shared/types";

export const FolderContext = createContext([] as any);

export const FolderProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [folders, setFolders] = useState<Array<Folder>>([]);
  const getFolders = async () => {
    try {
      const { data } = await axios.get(`${FOLDERS_PATH}/${user?._id}`);
      setFolders(data);
    } catch {
      console.error("could not fetch folders");
    }
  };

  useEffect(() => {
    if (user) {
      getFolders();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <FolderContext.Provider value={[folders, setFolders]}>
      {children}
    </FolderContext.Provider>
  );
};
