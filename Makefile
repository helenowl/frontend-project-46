install:
	npm ci

gendiff:
	node/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage

test:
	npx -n --experimental-vm-modules jest