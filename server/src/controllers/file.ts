import { Request, Response } from "express";
import { mkdir, remove, rename, stat } from "fs-extra";
import { join, parse, relative } from "path";
import { sortBy } from "lodash";
import formidable from "formidable";
import find from "find";

import { readDirectory, pathGlobal, formatBytes } from "../utils/file";

// get all files & folders for requested path (not recursively)
export const filePost = async (req: Request, res: Response) => {
  const pathSearch = join(pathGlobal, "/", req.body.path);
  readDirectory(pathSearch).then(data =>
    Promise.all(data).then((data: any) => {
      const directories = sortBy(
        data.filter(d => d.type === "directory"),
        "name"
      );

      const noHiddenFiles = data.filter(
        // eslint-disable-next-line no-useless-escape
        item => !/(^|\/)\.[^\/\.]/g.test(item.name)
      );
      const files = sortBy(
        noHiddenFiles.filter(d => d.type === "file"),
        "name"
      );
      const result = [...directories, ...files];
      res.json(result);
    })
  );
};

// create directory at specified path
export const fileDirectoryPost = async (req: Request, res: Response) => {
  const pathDirectory = join(pathGlobal, "/", req.body.path);
  mkdir(pathDirectory)
    .then(() => res.json())
    .catch(err => res.json({ err }));
};

// delete file or directory (even folder with content)
export const fileDelete = async (req: Request, res: Response) => {
  const pathDirectory = join(pathGlobal, "/", req.body.path);
  remove(pathDirectory)
    .then(() => res.json())
    .catch(err => res.json({ err }));
};

// rename directory or file
export const fileRenamePost = async (req: Request, res: Response) => {
  const oldPath = join(pathGlobal, "/", req.body.oldPath);
  const newPath = join(pathGlobal, "/", req.body.newPath);
  rename(oldPath, newPath)
    .then(() => res.json())
    .catch(err => res.json({ err }));
};

// create file at specified path
export const fileUploadPost = async (req: Request, res: Response) => {
  const pathSub = req.query.path;
  const form = new formidable.IncomingForm();
  // limit 20 GB
  form.maxFileSize = 20000 * 1024 * 1024;
  form.multiples = true;
  form.parse(req);
  form
    .on("fileBegin", (name, file) => {
      file.path = `${pathGlobal}/${pathSub}/${file.name}`;
    })
    .on("error", err => {
      console.error("Error file upload", err);
      res.json({ err });
    })
    .on("end", () => {
      res.end();
    });
};

// find file recursively full text search
export const fileSearchGet = (req: Request, res: Response) => {
  const searchName = req.query.name;
  const reg = new RegExp(searchName, "gi");
  const searchPromise = new Promise((resolve, reject) => {
    find.file(reg, pathGlobal, files => {
      const filesPromises = files.map(f => {
        return new Promise((resolve, reject) => {
          const info = stat(f);
          info
            .then(stats => {
              resolve({
                name: parse(f).base,
                type: "file",
                path: relative(pathGlobal, f),
                size: formatBytes(stats.size)
              });
            })
            .catch(err => reject(err));
        });
      });
      Promise.all(filesPromises)
        .then(files => resolve(files))
        .catch(err => reject(err));
    });
  });

  searchPromise
    .then(files => res.json({ files }))
    .catch(err => res.json({ err }));
};
