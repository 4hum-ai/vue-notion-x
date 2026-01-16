declare module 'notion-utils' {
  export function getTextContent(value?: any): string
  export function getBlockIcon(block: any, recordMap: any): string | null
  export function getBlockTitle(block: any, recordMap: any): string
  export function normalizeUrl(url?: string): string
  export function parsePageId(id: string, options?: any): string | null
  export function uuidToId(uuid: string): string
  export function getPageTableOfContents(block: any, recordMap: any): any[]
  export function formatDate(date: any, format?: string): string
  export function isUrl(url: string): boolean
  export function formatNotionDateTime(date: any): string
  export function getBlockCollectionId(
    block: any,
    recordMap: any
  ): string | null
  export function getBlockParentPage(
    block: any,
    recordMap: any,
    options?: { inclusive?: boolean }
  ): any
  export function getPageBreadcrumbs(
    recordMap: any,
    activePageId: string
  ): any[] | null
}

declare module 'notion-client' {
  export class NotionAPI {
    constructor(options?: any)
    getPage(pageId: string, options?: any): Promise<any>
  }
}
