export function getFileURL(fromProjectDir: string): string {

  const projectDir = import.meta.url.split('/src')[0];
  // Project dir === 'file:///Users/gunn/CodespaceLocal/BlogPublishing/_Headquarter'

  let filePath = fromProjectDir
    .replace('@/', 'server/src/')

  return new URL(filePath, projectDir).pathname
}