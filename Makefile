TOP_DIR=.
README=$(TOP_DIR)/README.md

VERSION=v$(strip $(shell cat package.json | grep version | head -n 1 |  awk '{print $2}' | sed 's/"//g' | sed 's/,//g'))
RELEASE_VERSION=$(VERSION)
GIT_BRANCH=$(strip $(shell git symbolic-ref --short HEAD))
GIT_VERSION="$(strip $(shell git rev-parse --short HEAD))"

build:
	@echo "Building the software..."

init: install dep
	@echo "Initializing the repo..."

install:
	@echo "Install software required for this repo..."
	@npm install -g yarn @abtnode/cli

dep:
	@echo "Install dependencies required for this repo..."
	@yarn

pre-build: install dep
	@echo "Running scripts before the build..."

post-build:
	@echo "Running scripts after the build is done..."

all: pre-build build post-build

test:
	@echo "Running test suites..."

lint:
	@echo "Linting the software..."
	@yarn lint

doc:
	@echo "Building the documenation..."

precommit: dep doc build test

github-action-init: precommit
	@sudo npm install -g yarn @abtnode/cli

clean:
	@echo "Cleaning the build..."

run:
	@echo "Running the software..."
	@yarn start


release:
	@git config --local user.name "ezioruan"
	@git config --local user.email "ezioruan@gmail.com"
	@git tag -a $(RELEASE_VERSION) -m "Release $(RELEASE_VERSION). Revision is: $(GIT_VERSION)" | true
	@git push origin $(RELEASE_VERSION) | true

.PHONY: build init install dep pre-build post-build all test doc precommit github-action-test clean watch run bump-version create-pr 
