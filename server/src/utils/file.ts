import { readdir, stat, Stats } from "fs-extra";
import { relative, join } from "path";

export const pathGlobal = join(__dirname, "../../files");

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const getStatsOrSubFiles = (
  path: string,
  file: string,
  stats: Stats
) => {
  return new Promise(resolve => {
    const pathDirectory = path + "/" + file;
    if (stats.isDirectory()) {
      resolve({
        name: file,
        type: "directory",
        path: relative(pathGlobal, pathDirectory),
        size: 0
      });
      // gets items recursive
      // return readDirectory(pathDirectory).then(data => {
      //   return Promise.all(data).then(data => resolve({
      //     name: file,
      //     type: "directory",
      //     path: relative(pathGlobal, pathDirectory),
      //     size: 0,
      //     items: data
      //   }))
      // })
    }
    resolve({
      name: file,
      type: "file",
      path: relative(pathGlobal, pathDirectory),
      size: formatBytes(stats.size)
    });
  });
};

const getStat = (items: string[], path: string) => {
  const promisesStats = items.map(item => {
    const pathFile = path + "/" + item;
    const info = stat(pathFile);
    return info.then(stats => getStatsOrSubFiles(path, item, stats));
  });
  return promisesStats;
};

export const readDirectory = (path: string) =>
  readdir(path).then(items => getStat(items, path));
