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
        if (!Array.isArray(parsed))
            return null;
        if (parsed.length != 3)
            return null;
        if (isNaN(parseInt(parsed[1])))
            return null;
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
        return JSON.stringify([this.app, parseInt(this.userId), this.fragment.toString()]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTtJQUtJLGFBQW1CLEdBQVksRUFBRSxNQUFlLEVBQUUsUUFBaUI7UUFFL0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBQ2EsU0FBSyxHQUFuQixVQUFvQixJQUFhLEVBQUUsUUFBaUI7UUFFaEQsSUFBTSxNQUFNLEdBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDckIsT0FBTyxJQUFJLENBQUM7UUFDaEIsSUFBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDakIsT0FBTyxJQUFJLENBQUM7UUFDaEIsSUFBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBRyxHQUFHLENBQUMsTUFBTSxJQUFJLFFBQVE7WUFDckIsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDbkIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ2EsWUFBUSxHQUF0QixVQUF1QixLQUFnQixFQUFFLFFBQWlCO1FBRXRELElBQU0sTUFBTSxHQUFXLEVBQUUsQ0FBQztRQUMxQixLQUFrQixVQUFLLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSyxFQUN2QjtZQURJLElBQU0sSUFBSSxjQUFBO1lBRVYsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNNLDRCQUFjLEdBQXJCO1FBRUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFDTSw2QkFBZSxHQUF0QixVQUF1QixRQUFpQjtRQUVwQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9CLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDM0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxVQUFDO0FBQUQsQ0FBQyxBQS9DRCxJQStDQztBQS9DWSxrQkFBRyJ9