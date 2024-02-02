import * as fs from 'fs';
import * as path from 'path';

export interface RouterProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  route: string;
  controller: any;
  action: string;
}

const getRouter: any = (filename: string) => {
  filename = filename.replace('.ts', '');
  const [name, router] = filename.split('.');
  const varName: string = `${name.replace(/(?:^|\W)(\w)/g, (_, firstLetter) => firstLetter.toUpperCase())}Router`;
  return varName;
};
const currentDir = `${path.join(process.cwd(), 'src', 'app')}`;

const modules: any = fs.readdirSync(currentDir);
export const Routes = (): RouterProps[] => {
  const routes: RouterProps[] = [];

  modules?.map((mod: any) => {
    const files: any = fs.readdirSync(path.join(currentDir, mod)).filter((file) => file?.includes('.router.ts'));

    files.map((file: string) => {
      const variableName = getRouter(file);
      const routeFile = require(path.join(currentDir, mod, file));
      routes.push(...routeFile[variableName]);
    });
  });

  return routes;
};

export * from './router';
