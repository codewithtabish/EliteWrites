export const generateSlug = (title: string) => {
    return title
        ?.toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

