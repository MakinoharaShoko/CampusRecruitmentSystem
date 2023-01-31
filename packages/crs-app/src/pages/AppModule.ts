import { testDecoratorModule } from '@/pages/test-decorator-page/TestDecoratorModule';
import { TestZustand } from './test-zustland/testZustland';
import { Pg21 } from '@/pages/playground2/pg2-1';

export const appModule = [...testDecoratorModule, TestZustand, Pg21];
