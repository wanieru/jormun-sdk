"use strict";
exports.__esModule = true;
exports.Key = void 0;
var Key = /** @class */ (function () {
    function Key(app, userId, fragment) {
        this.app = app;
        this.userId = userId;
        this.fragment = fragment;
    }
    Key.parse = function (json, remoteId) {
        var parsed = JSON.parse(json);
        var key = new Key(parsed[0], parsed[1], parsed[2]);
        if (key.userId == remoteId)
            key.userId = 0;
        return key;
    };
    Key.parseAll = function (jsons, remoteId) {
        var result = [];
        for (var _i = 0, jsons_1 = jsons; _i < jsons_1.length; _i++) {
            var json = jsons_1[_i];
            result.push(Key.parse(json, remoteId));
        }
        return result;
    };
    Key.prototype.stringifyLocal = function () {
        return JSON.stringify([this.app, this.userId, this.fragment]);
    };
    Key.prototype.stringifyRemote = function (remoteId) {
        var originalId = this.userId;
        if (this.userId == 0)
            this.userId = remoteId;
        var json = this.stringifyLocal();
        this.userId = originalId;
        return json;
    };
    return Key;
}());
exports.Key = Key;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTtJQUtJLGFBQW1CLEdBQVksRUFBRSxNQUFlLEVBQUUsUUFBaUI7UUFFL0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBQ2EsU0FBSyxHQUFuQixVQUFvQixJQUFhLEVBQUUsUUFBaUI7UUFFaEQsSUFBTSxNQUFNLEdBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxRQUFRO1lBQ3JCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNhLFlBQVEsR0FBdEIsVUFBdUIsS0FBZ0IsRUFBRSxRQUFpQjtRQUV0RCxJQUFNLE1BQU0sR0FBVyxFQUFFLENBQUM7UUFDMUIsS0FBa0IsVUFBSyxFQUFMLGVBQUssRUFBTCxtQkFBSyxFQUFMLElBQUssRUFDdkI7WUFESSxJQUFNLElBQUksY0FBQTtZQUVWLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUMxQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTSw0QkFBYyxHQUFyQjtRQUVJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ00sNkJBQWUsR0FBdEIsVUFBdUIsUUFBaUI7UUFFcEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsVUFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7QUF6Q1ksa0JBQUcifQ==