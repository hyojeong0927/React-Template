// theme/generate-scss-theme.js
import fs from 'fs';
import path from 'path';
import { muiTheme } from './muiTheme.js';

const theme = muiTheme;

const scssVars = `
// ⚙️ 자동 생성 파일 — 직접 수정하지 마세요!
$spacing-base: ${theme.spacing(1)}; // MUI spacing base
$primary-main: ${theme.palette.primary.main};
$secondary-main: ${theme.palette.secondary.main};
$error-main: ${theme.palette.error.main};
$success-main: ${theme.palette.success.main};
$warning-main: ${theme.palette.warning.main};
$info-main: ${theme.palette.info.main};
`;

const outputPath = path.resolve('src/styles/abstracts/_mui-theme.scss');
fs.writeFileSync(outputPath, scssVars);
console.log(`✅ SCSS theme variables generated at: ${outputPath}`);
