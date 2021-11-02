"use strict";
exports.__esModule = true;
exports.Key = void 0;
/** Represents the key of some data. */
var Key = /** @class */ (function () {
    function Key(app, userId, fragment) {
        this.app = app;
        this.userId = userId;
        this.fragment = fragment;
    }
    /** Parse a stringified key. If the stringified key belongs to the specified remoteId, the userId will instead be 0. Returns null if the key is malformed. */
    Key.parse = function (json, remoteId) {
        var parsed = JSON.parse(json);
        if (!Array.isArray(parsed))
            return null;
        if (parsed.length != 3)
            return null;
        if (isNaN(parseInt(parsed[1])))
            return null;
        var key = new Key(parsed[0].toString(), parseInt(parsed[1]), parsed[2].toString());
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
    /** Stringify the key for local use. If userId is 0, it will remain 0. */
    Key.prototype.stringifyLocal = function () {
        return JSON.stringify([this.app.toString(), parseInt(this.userId), this.fragment.toString()]);
    };
    /** Stringify the key for remote use. If userId is 0, it will instead be the specified remoteId. RemoteId should be the userId gotten from remote's "status". */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBdUM7QUFDdkM7SUFRSSxhQUFtQixHQUFZLEVBQUUsTUFBZSxFQUFFLFFBQWlCO1FBRS9ELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUNELDZKQUE2SjtJQUMvSSxTQUFLLEdBQW5CLFVBQW9CLElBQWEsRUFBRSxRQUFpQjtRQUVoRCxJQUFNLE1BQU0sR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNyQixPQUFPLElBQUksQ0FBQztRQUNoQixJQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNqQixPQUFPLElBQUksQ0FBQztRQUNoQixJQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsT0FBTyxJQUFJLENBQUM7UUFDaEIsSUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyRixJQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksUUFBUTtZQUNyQixHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNuQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDYSxZQUFRLEdBQXRCLFVBQXVCLEtBQWdCLEVBQUUsUUFBaUI7UUFFdEQsSUFBTSxNQUFNLEdBQVcsRUFBRSxDQUFDO1FBQzFCLEtBQWtCLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLLEVBQ3ZCO1lBREksSUFBTSxJQUFJLGNBQUE7WUFFVixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0QseUVBQXlFO0lBQ2xFLDRCQUFjLEdBQXJCO1FBRUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLENBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFDRCxnS0FBZ0s7SUFDekosNkJBQWUsR0FBdEIsVUFBdUIsUUFBaUI7UUFFcEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsVUFBQztBQUFELENBQUMsQUFyREQsSUFxREM7QUFyRFksa0JBQUcifQ==