import React from "react";

export interface Route {
    path: string;
    icon: React.ReactNode;
    component: React.FC;
    props?: Record<string,any>
    key: string;
    name: string
}

export type InnerRoute  = Omit<Route, "icon">