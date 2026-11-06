-- Apply after 0001_radio.sql. Broadcast status is editorial, not proof the audio source is reachable.
CREATE TABLE IF NOT EXISTS broadcast_state (
 id INTEGER PRIMARY KEY CHECK(id = 1),
 is_on_air INTEGER NOT NULL DEFAULT 0 CHECK(is_on_air IN (0,1)),
 show_title TEXT NOT NULL DEFAULT '',
 host TEXT NOT NULL DEFAULT '',
 message TEXT NOT NULL DEFAULT '',
 started_at INTEGER NOT NULL DEFAULT 0,
 updated_at INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO broadcast_state(id,is_on_air,show_title,host,message,started_at,updated_at)
VALUES(1,0,'','','',0,0);
