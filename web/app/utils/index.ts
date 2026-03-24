import type { PageModulaire, Project } from "~/utils/sanity-api/sanity.types";
import type { ProjectExpanded } from "./sanity-api/sanity-extend.types";

export function _formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

export function _linkResolver(doc: Project | ProjectExpanded | PageModulaire) {
  if (!doc.slug) return "/";
  if (doc._type === "pageModulaire" && doc.homePage) {
    return "/#projects";
  }
  switch (doc._type) {
    case "project":
      return `/project/${doc.slug.current}`;
    case "pageModulaire":
      return `/${doc.slug.current}`;

    default:
      return "/";
  }
}
