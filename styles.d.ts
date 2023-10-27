declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Similarly, for other CSS-like modules if you use them:
declare module "*.module.scss";
declare module "*.module.sass";
declare module "*.module.less";
