import { Route, InnerRoute } from "interfaces/entity/routes";
import { lazy } from "react";
import {LayoutDashboard, Megaphone, BarChart2 } from 'lucide-react';

export const MainRoutes:Array<Route> = [
    {
        key: "dashboard",
        name: "dashboard",
        component: lazy(() => import('screens/comingsoon')),
        icon: <LayoutDashboard style={{margin:0, padding:0, marginTop: 8,paddingRight: 5}}/>,
        path: "/dashboard",
    },
    {
        key: "campaigns",
        name: "campaigns",
        component: lazy(() => import('screens/campaigns')),
        icon: <Megaphone style={{margin:0, padding:0, marginTop: 8,paddingRight: 5}}/>,
        path: "/campaigns",
    },
    {
        key: "templates",
        name: "templates",
        component: lazy(() => import('screens/templates')),
        icon: <BarChart2 style={{margin:0, padding:0, marginTop: 8,paddingRight: 5}}/>,
        path: "/templates",
    },
    // {
    //     key: "segments",
    //     name: "Segments",
    //     component: lazy(() => import('screens/comingsoon')),
    //     icon: <Filter  style={{margin:0, padding:0, marginTop: 8,paddingRight: 5}}/>,
    //     path: "/segments",
    // },
    // {
    //     key: "users",
    //     name: "Users",
    //     component: lazy(() => import('screens/comingsoon')),
    //     icon: <User style={{margin:0, padding:0, marginTop: 8,paddingRight: 5}}/>,
    //     path: "/users",
    // },
    // {
    //     key: "settings",
    //     name: "Settings",
    //     component: lazy(() => import('screens/comingsoon')),
    //     icon: <Settings style={{margin:0, padding:0, marginTop: 8,paddingRight: 5}}/>,
    //     path: "/settings",
    // }
]

export const InnerRoutes:Array<InnerRoute>  = [
    {
        key: "create-template",
        name: "create template",
        component: lazy(() => import('screens/templates/components/AddTemplate')),
        path: "/templates/create",
    },
    {
        key: "create-campaign",
        name: "create campaign",
        component: lazy(() => import('screens/campaigns/components/AddCampaign')),
        path: "/campaigns/create",
    },
    {
        key: "view-template",
        name: "view template",
        component: lazy(() => import('screens/templates/components/ReviewTemplate')),
        path: "/templates/view/:templateId",
    },
    {
        key: "view-template",
        name: "view template",
        component: lazy(() => import('screens/templates/components/AddTemplate')),
        path: "/templates/edit/:id/:templateId",
    },
]