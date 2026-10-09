<?php
return ['revision' => is_file(base_path('REVISION')) ? trim(file_get_contents(base_path('REVISION'))) : 'development'];
