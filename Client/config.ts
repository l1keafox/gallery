interface Config {

}

export const config: Config = {

};

export const URL = process.env["PUBLISHED_URL"] ?? "http://localhost:3000";
export const GALLERY_PER_PAGE = 15;
