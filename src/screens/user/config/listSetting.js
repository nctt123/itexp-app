import SvgComponent from "@assets/svg";
import * as screenTypes from "@navigation/screenTypes";

export const LIST_SETTING = [
  {
    title: "posts",
    icon: SvgComponent.doc,
    route: screenTypes.MyPosts,
  },
  {
    title: "projects",
    icon: SvgComponent.doc,
    route: screenTypes.ProjectList,
  },
  {
    title: "createProject",
    icon: SvgComponent.add,
    route: screenTypes.CreateProject,
  },
  {
    title: "contactUs",
    icon: SvgComponent.contactUs,
    route: screenTypes.ContactUs,
  },
  {
    title: "logoutAccount",
    icon: SvgComponent.signOut,
    route: "logoutAccount",
  },
];
