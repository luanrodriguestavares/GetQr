declare module 'react-instascan' {
    export const Cameras: React.FC<{ children: (cameras: any[]) => React.ReactNode }>;
    export const Scanner: React.FC<{ camera: any, onScan: (content: string) => void }>;
}