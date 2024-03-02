@echo off

@echo Started: %date% %time%

rem Build app
call ng build --prod --output-path=dist1 --base-href=/EFAM/ --aot=true
rem Copy WEB-INF to dist
rem jar -cvf IB.war *
call xcopy .\WEB-INF .\dist1\WEB-INF /i
rem War app
rem npm install -g grunt -cli
rem npm install grunt --save-dev
rem npm install grunt-war --save-dev
rem call npm run warkhdn

cd dist1

D:\Java\jdk1.8.0_271\bin\jar -cvf ..\warFile\EFAM.war .\

@echo Completed: %date% %time%