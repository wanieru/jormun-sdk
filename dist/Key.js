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
        var parsed = JSON.parse(json); //Not actually a key instance
        var key = new Key(parsed.app, parsed.userId, parsed.app);
        if (key.userId == remoteId)
            key.userId = -1;
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
        return JSON.stringify(this);
    };
    Key.prototype.stringifyRemote = function (remoteId) {
        var originalId = this.userId;
        if (this.userId == -1)
            this.userId = remoteId;
        var json = JSON.stringify(this);
        this.userId = originalId;
        return json;
    };
    return Key;
}());
exports.Key = Key;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTtJQUtJLGFBQW1CLEdBQVksRUFBRSxNQUFlLEVBQUUsUUFBaUI7UUFFL0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBQ2EsU0FBSyxHQUFuQixVQUFvQixJQUFhLEVBQUUsUUFBaUI7UUFFaEQsSUFBTSxNQUFNLEdBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLDZCQUE2QjtRQUNuRSxJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELElBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxRQUFRO1lBQ3JCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ2EsWUFBUSxHQUF0QixVQUF1QixLQUFnQixFQUFFLFFBQWlCO1FBRXRELElBQU0sTUFBTSxHQUFXLEVBQUUsQ0FBQztRQUMxQixLQUFrQixVQUFLLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSyxFQUN2QjtZQURJLElBQU0sSUFBSSxjQUFBO1lBRVYsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNNLDRCQUFjLEdBQXJCO1FBRUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDTSw2QkFBZSxHQUF0QixVQUF1QixRQUFpQjtRQUVwQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9CLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDM0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsVUFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7QUF6Q1ksa0JBQUcifQ==