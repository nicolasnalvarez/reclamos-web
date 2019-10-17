import {getSessionCookie} from "./CookiesUtils";
import * as React from "react";

export const SessionContext = React.createContext(getSessionCookie());