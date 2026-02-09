declare module 'https://cdn.jsdelivr.net/npm/JSCPP@2.0.9/+esm' {
  interface JSCPPOptions {
    stdio?: {
      write?: (output: string) => void;
      read?: () => string;
    };
  }

  interface JSCPP {
    run: (code: string, input: string, options?: JSCPPOptions) => Promise<number | undefined>;
  }

  const jscpp: JSCPP;
  export default jscpp;
}
