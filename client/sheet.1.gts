<!DOCTYPE html>
<html>
    <head>
        <title>Goals &middot; RS Goal Tracker</title>
        <link rel="stylesheet" href="css/style.css"></link>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    </head>
    <body>
        <nav class="navbar navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand">RS Goal Tracker</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav nav-pills">
                        <li><a href="/new">New</a></li>
                        <li><a href="/cp/{#id}">Duplicate</a></li>
                        <li><a href="/ro/{#id}">Read-only</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <header>
            <h4 class="logo-text">RS Goal Tracker: {#title}</h4>
            <div class="hdr-actions">
                <a class="hdr-action has-tooltip" href="/new" tooltip="Create a new goal sheet">New</a>
                <a class="hdr-action has-tooltip" href="/cp/{#id}" tooltip="Create a copy of this goal sheet (does not copy progress)">Copy</a>
                <a class="hdr-action has-tooltip" href="/ro/{#id}" tooltip="Create a read-only link to show others">Read-only</a>
            </div>
        </header>
        
        <div id="dimmer"></div>
        
        <div id="goalsheet"></div>
        
        <div id="add-item">
            <div class="goal-type-tab"></div><div class="goal-settings"></div><div class="goal-picker"></div>
        </div>
        
        <script src="https://code.jquery.com/jquery-3.1.0.min.js" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=" crossorigin="anonymous"></script>
        <script src="js/ui.js"></script>
        <script src="js/goalsheet.js"></script>
        <script>
            populateData({#sheetData});
        </script>
    </body>
</html>