install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
lints:
	npx eslint --fix .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
