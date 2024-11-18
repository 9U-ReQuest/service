# bun run init 실행 전, root에서 아래 명령어를 실행하여 sh 파일의 실행 권한을 부여합니다.
# chmod +x ./scripts/**/*.sh
# 이후 sh 파일의 줄바꿈 형식을 LF로 변경합니다.

cd storybook && pnpm install
cd ../

for dir in packages/*; do
  if [ -d "$dir" ]; then
    (cd "$dir" && bun link)
  fi
done

# into gasi and bun link
cd apps/gasi && bun link
cd ../

for app in apps/*; do
  if [ -d "$app" ]; then
    for package in packages/*; do
      if [ -d "$package" ]; then
        package_name=$(jq -r .name "$package/package.json")        
        (cd "$app" && bun link "$package_name")
      fi
    done
  fi
done
