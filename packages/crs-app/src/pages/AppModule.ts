import { testDecoratorModule } from '@/pages/test-decorator-page/TestDecoratorModule';
import { TestZustand } from './test-zustland/testZustland';

export const appModule = [...testDecoratorModule, TestZustand];
