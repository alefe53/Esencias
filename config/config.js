// Mis-Esencias/config/config.js
import path from "node:path";
import { fileURLToPath } from "node:url";

const __configFilename = fileURLToPath(import.meta.url);
const __configDirname = path.dirname(__configFilename);

const serverSettings = {
    PORT: process.env.PORT || 3001,
    HOST: process.env.HOST || "127.0.0.1",
};

const pathSettings = {
    PROJECT_ROOT: path.resolve(__configDirname, ".."),
    SRC: path.resolve(__configDirname, "..", "src"),
    VIEWS: path.resolve(__configDirname, "..", "src", "views"),
    ROUTES: path.resolve(__configDirname, "..", "src", "routes"),
    CONTROLLERS: path.resolve(__configDirname, "..", "src", "controllers"),
    DB: path.resolve(__configDirname, "..", "src", "db"),
    MODELS: path.resolve(__configDirname, "..", "src", "models"), 
    REPOSITORIES: path.resolve(__configDirname, "..", "src", "repository"), 
    PUBLIC: path.resolve(__configDirname, "..", "public"),
    CONFIG_FILENAME: __configFilename,
    CONFIG_DIRNAME: __configDirname
};

export const config = {
    server: serverSettings,
    paths: pathSettings,
};