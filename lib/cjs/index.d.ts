export declare const registerUmami: (url: string) => void;
export type Track = (name: string, data?: any) => void;
export declare const useUmami2: (websiteId: string, disabledPageView?: boolean, disableAll?: boolean) => Track;
declare const useUmami: (websiteId: string, url?: string, title?: string, hostname?: string, referrer?: string, width?: number, height?: number, disabledPageView?: boolean, disableAll?: boolean) => Track;
export default useUmami;