import type { NextConfig } from "next"
import { RuleSetRule } from "webpack"

const nextConfig: NextConfig = {
  webpack(config) {
    // Remove the default SVG loader from Next.js (important!)
    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
      if (typeof rule === "object" && rule !== null && "test" in rule && rule.test instanceof RegExp && rule.test.test(".svg")) {
        return {
          ...rule,
          exclude: /\.svg$/ // exclude svg from the default rule
        }
      }
      return rule
    })

    // Add SVGR support
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    })

    return config
  }
}

export default nextConfig