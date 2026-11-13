# Homework 1

React 19 + MobX + TypeScript + Vite, стили — CSS Modules, линтер и
форматтер — Biome.

## Архитектура

Перед любой разработкой (новая фича, компонент, стор, хук, перенос кода)
сверяйся с правилами из `ARCHITECTURE.md` и следуй им. Если задача
противоречит правилам — сначала скажи об этом, а не отступай от них молча.

@ARCHITECTURE.md

После изменений `npm run check:fix` и `npm run typecheck` должны проходить
без ошибок.

## Навыки

`.claude/skills/react-best-practices` — копия `skills/react-best-practices` из
[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills),
коммит `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62`, лицензия MIT
(`LICENSE` в папке навыка). Обновляй копированием каталога целиком; навык
исключён из Biome.

Проект — клиентское SPA на Vite: применяй категории `async-`, `client-`,
`rerender-`, `rendering-`, `js-`, `advanced-`. Правила `ARCHITECTURE.md` имеют
приоритет над навыком.
