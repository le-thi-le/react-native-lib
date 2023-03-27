import { RNBelle } from 'react-native-belle-core';

export class CameraConfig {
  /**
   * Get Cached Image from Native
   * @param subjectId
   * @param bodyPart
   * @param isThumbnail
   * @returns
   */
  static getCachedFile(
    subjectId: string,
    fileName: string,
    isThumbnail: boolean,
    encrypted?: boolean,
    outputAsBase64?: boolean,
  ) {
    return RNBelle.cache.getCachedFile(
      subjectId,
      fileName,
      isThumbnail,
      encrypted,
      outputAsBase64,
    );
  }

  /**
   * Delete Cached Files
   * @param subjectId
   * @returns
   */
  static deleteCachedFiles(subjectId: string | null) {
    return RNBelle.cache.deleteInFolder(subjectId);
  }
  /**
   * get path Cached Files
   * @param subjectId
   * @param bodyPart
   * @param isThumbnail
   * @returns
   */
  static getPathCacheFile(
    subjectId: string,
    fileName: string,
    isThumbnail: boolean,
  ) {
    return RNBelle.cache.getCachedFilePath(subjectId, fileName, isThumbnail);
  }
  //Clear data
  static deleteAllCache() {
    return RNBelle.cache.clear();
  }

  static checkFileCached(
    isThumbnail: boolean, //true = only check large photo; false = large photo or thumbnail
  ) {
    return RNBelle.cache.hasCachedFiles(isThumbnail);
  }
}
