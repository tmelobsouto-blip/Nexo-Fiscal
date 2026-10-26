import { Config } from '@remotion/cli/config';

// Cloud sessions export REMOTION_BROWSER from .claude/hooks/session-start.sh.
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}
