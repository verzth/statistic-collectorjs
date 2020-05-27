# statistic-collectorjs
[![GitHub version](https://badge.fury.io/gh/verzth%2Fstatistic-collectorjs.svg)](https://badge.fury.io/gh/verzth%2Fstatistic-collectorjs)
[![npm version](https://badge.fury.io/js/%40verzth%2Fstatistic-collectorjs.svg)](https://badge.fury.io/js/%40verzth%2Fstatistic-collectorjs)

Javascript Library for Statistic Engine to Collect data.

### Dependencies
- [jquery](https://jquery.com/)
- [Moment](https://momentjs.com/)

### Installation
NPM
```bash
npm i @verzth/statistic-collectorjs
```
or
```bash
npm i --save @verzth/statistic-collectorjs
```

### How to Use:
1. Add script in your html, use collector.min.js for minified version.
   ```html
   <script src="{file_path}/jquery.min.js"></script>
   <script src="{file_path}/moment.min.js"></script>
   <script src="{file_path}/collector.min.js"></script>
   ```

2. Initialize Statistic object with params, it will use default value if you don't provide params.
   ```javascript
   var collector = new Collector({
    host : 'SERVER_HOST',
    key : 'YOUR_KEY'
   });
   ```
3. Available function:

   - `prepareHit()`: Collector - Prepare statistic data collector for **HIT**.
   - `prepareContent()`: Collector - Prepare statistic data collector for **CONTENT**.
        - `setID(string id)`: Collector - Set Content ID, such as book id, music id, etc.
        - `setType(string type)`: Collector - Set Content Type.
        - `setCategory(string category)`: Collector - Set Content Category.
        - `setAction(string ...action)`: Collector - Set Action of Content (Ex: Impression, Click, etc).
   - `prepareEvent()`: Collector - Prepare statistic data collector for **EVENT**.
        - `setID(string id)`: Collector - Set Event ID such as invoice number.
        - `setType(string type)`: Collector - Set Event Type.
        - `setCategory(string category)`: Collector - Set Event Category.
        - `setName(string ...name)`: Collector - Set Name of Event (Ex: Sale, Buy, Play, Open App, etc).
        - `setOk(boolean state|true)`: Collector - Set event status state.
        - `setStatus(string status)`: Collector - Set event status.
        - `setStatusCode(string code)`: Collector - Set event status code.
        - `setStatusMessage(string message)`: Collector - Set event status message.
   - `setRange(string startDate, string endDate)`: Collector - Set date range of data, use **RFC3339** format.
   - `setPage(string page)`: Collector - Set Page name.
   - `setPageType(string type)`: Collector - Set Page type.
   - `setInteraction(boolean interaction)`: Collector - Set Interaction type, "true" user action, "false" system action.
   - `setUserID(string id)`: Collector - Set User ID.
   - `setDevice(string id)`: Collector - Set Device ID. or
   - `setDevice(object device)`: Collector - Set Device filter using object. Ex: { id:"ABC123", os:"ANDROID" }.
   - `setLocation(object location)`: Collector - Set Location filter using object. Ex: { city:"Jakarta", admin:"West Jakarta" }.
   - `setAttributes(object attributes)`: Collector - Set your custom filter using object. Ex: { category_id: 1, seller_id: 5, brand_id: 3 }.
   - `merge()`: Collector - SUM hit result to produce total.
   - `withColumns(string ...column)`: Add some fields to collected data. The standard column shown below, but custom column may described in advance.
        - `Collector.COLUMN_PAGE`.
        - `Collector.COLUMN_PAGE_TYPE`.
   - `collect(time, callback{function success, function failed})`: void - Collect data from the server, for `time` parameter use standard time below:
        - `Collector.HOURLY`.
        - `Collector.DAILY`.
        - `Collector.WEEKLY`.
        - `Collector.MONTHLY`.
