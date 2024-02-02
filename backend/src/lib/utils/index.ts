import dayjs from 'dayjs';

let loadingInterval: NodeJS.Timer | null = null;

export const colors = {
  reset: '\x1b[0m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

export const logInfo = (
  type: 'info' | 'error' | 'success' | 'none',
  message: string,
  color: string = 'reset',
  loading: boolean = false,
  clear: boolean = false,
  cron: boolean = false,
): void => {
  const now: string = `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`;

  const typeLog: any = {
    none: '',
    info: `${colors.blue}[${type?.toUpperCase()}] ${now} -`,
    error: `${colors.red}[${type?.toUpperCase()}] ${now} -`,
    success: `${colors.green}[${type?.toUpperCase()}] ${now} - `,
  };

  const selectedColor = colors[color] || colors.reset;

  if (clear) {
    console.clear();
  }

  const logMessage = `${typeLog[type]} ${selectedColor}${message}${colors.reset}\n`;

  if (process.env.APP_ENV === 'production') {
    console.log(logMessage);
  } else {
    console.log(logMessage);
  }

  process.on('exit', () => {
    if (clear) {
      console.clear();
    }
  });
};
