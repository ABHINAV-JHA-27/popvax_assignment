export default function Logger(message: string, type?: string) {
  let prefix = "";
  switch (type) {
    case "info":
      prefix = "[server]";
      break;
    case "database":
      prefix = "[database]";
      break;
    case "auth":
      prefix = "[auth]";
      break;
    case "error":
      prefix = "[error]";
      break;
    default:
      prefix = "[server]";
      break;
  }
  console.log(`${prefix}: ${message}`);
}
