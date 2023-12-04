/*
 * index.ts
 *
 * Created by Dr. Maximillian Dornseif 2023-12-03 in fastify-for-appengine-1 0.1.0
 * Copyright (c) 2023 Maximillian Dornseif
 */

import { nanoid } from 'nanoid';

function _levelToSeverity(level: number) {
  if (level < 30) {
    return 'debug';
  }

  if (level <= 30) {
    return 'info';
  }

  if (level <= 39) {
    return 'notice';
  }

  if (level <= 49) {
    return 'warning';
  }

  if (level <= 59) {
    return 'error';
  }

  if (level <= 69) {
    return 'critical';
  } // fatal

  if (level <= 79) {
    return 'alert';
  }

  if (level <= 79) {
    return 'emergency';
  }

  return 'DEFAULT';
}

const gaeFormatters = {
  level(_label: string, nr: number) {
    return {
      level: nr,
      severity: _levelToSeverity(nr).toUpperCase(),
    };
  },
};

export const fastifyConfig = {
  trustProxy: true, // GAE is our proxy
  logger: {
    messageKey: 'message', // for AppEngine Log structure
    formatters: gaeFormatters, // map levels to GAE severity
  },
  // https://cloud.google.com/appengine/docs/standard/writing-application-logs?tab=node.js#top
  genReqId(req: any): string {
    // use GAE request ID if available
    return `${
      req.headers['X-Appengine-Request-Log-Id'] ||
      req.headers['X-Cloud-Trace-Context'] ||
      nanoid(13)
    }`;
  },
};

export function startFastify(
  fastify: any,
  options: { serverName?: string; postfix?: string; defaultPort?: string } = {}
) {
  fastify.listen(
    {
      port: Number.parseInt(
        process.env.PORT || options.defaultPort || '4000',
        10
      ),
    },
    (err: Error | null, address: string) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }

      console.log(
        `🚀 ${options.serverName || 'Server'} listening on ${address}${
          options.postfix || ''
        }`
      );
    }
  );
}
