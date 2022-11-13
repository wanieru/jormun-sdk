# Jormun SDK

Jormun Sync (from Jörmungandr) is a framework which handles data storage and synchronization for web apps.

The intended use case is utility web apps such as Budget Management, Calorie Counting Apps, Todo-Lists, etc... These kinds of apps need to store data locally, and let the user synchronize it between devices. The Jormun SDK and Jormun Sync Server are supposed to make this easy, by removing the need for these apps to have their own backend and API.

Instead, we deploy a "bring-your-own-server" approach. The Jormun SDK lets the app easily save and load data, and then with a single method call, synchronize the local collection with the remote the user has specified, resolving any conflicts that may arise.

The SDK and Sync Server also support sharing data between users on the same server, and even making data available "unlisted" or "public".

The source for my sync server implementation is available here: https://github.com/wanieru/jormun-sync/

A public docker image is provided here: https://hub.docker.com/repository/docker/wanieru/jormun-sync
