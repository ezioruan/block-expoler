set -e

RELEASE_VERSION=v$(cat package.json | grep version | head -n 1 |  awk '{print $2}' | sed 's/"//g' | sed 's/,//g')
GIT_BRANCH=$(git symbolic-ref --short HEAD)
GIT_VERSION="$(git rev-parse --short HEAD)"
echo "publish version ${RELEASE_VERSION}"

git config --local user.name "ezioruan"
git config --local user.email "ezioruan@gmail.com"
npm run bundle

git tag -a ${RELEASE_VERSION} -m "Release ${RELEASE_VERSION}. Revision is: ${GIT_VERSION}" | true
git push origin ${RELEASE_VERSION} | true


