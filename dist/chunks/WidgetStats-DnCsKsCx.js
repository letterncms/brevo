import { locale as e, navigate as t, t as n, timeAgo as r, useAbility as i } from "@letterncms/sdk";
import { Button as a, Meter as o, QueryError as s, Stat as c, Widget as l, compactNumber as u } from "@letterncms/ui";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
// admin/src/WidgetStats.tsx
function p() {
	let e = i("brevo/stats", {}, { refetchInterval: 6e5 }), r = e.data, o = /* @__PURE__ */ d(a, {
		size: "sm",
		icon: "settings",
		onClick: () => t("/settings/email"),
		children: n("Open Settings")
	}), c = r?.state === "inactive" ? {
		icon: "brevo",
		title: n("Brevo is not your mail transport"),
		action: o
	} : r?.state === "no-key" ? {
		icon: "key",
		title: n("Add Your Brevo API Key"),
		action: o
	} : r?.state === "ok" && r.requests === 0 ? {
		icon: "brevo",
		title: n("No email sent through Brevo this week")
	} : null;
	return /* @__PURE__ */ f(l, {
		action: {
			label: n("Settings"),
			to: "/settings/email"
		},
		query: e,
		empty: c,
		children: [r?.state === "error" && /* @__PURE__ */ d(s, {
			compact: !0,
			title: n("No stats from Brevo"),
			message: r.message,
			onRetry: () => void e.refetch(),
			retrying: e.isFetching
		}), r?.state === "ok" && /* @__PURE__ */ d(m, { s: r })]
	});
}
function m({ s: e }) {
	let t = e.delivered / Math.max(1, e.requests), i = e.hardBounces + e.softBounces, a = [
		e.blocked > 0 && n("{count} blocked", { count: u(e.blocked) }),
		e.spamReports > 0 && n("{count} marked as spam", { count: u(e.spamReports) }),
		e.unsubscribed > 0 && n("{count} unsubscribed", { count: u(e.unsubscribed) })
	].filter(Boolean);
	return /* @__PURE__ */ f("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ f("div", {
				className: "grid grid-cols-2 gap-4 @md:grid-cols-4",
				children: [
					/* @__PURE__ */ d(c, {
						size: "sm",
						label: n("Delivered"),
						value: u(e.delivered)
					}),
					/* @__PURE__ */ d(c, {
						size: "sm",
						label: n("Open Rate"),
						value: h(e.opens / Math.max(1, e.delivered))
					}),
					/* @__PURE__ */ d(c, {
						size: "sm",
						label: n("Click Rate"),
						value: h(e.clicks / Math.max(1, e.delivered))
					}),
					/* @__PURE__ */ d(c, {
						size: "sm",
						label: n("Bounced"),
						value: u(i)
					})
				]
			}),
			/* @__PURE__ */ f("div", { children: [/* @__PURE__ */ f("div", {
				className: "mb-1.5 flex items-baseline justify-between text-xs",
				children: [/* @__PURE__ */ d("span", {
					className: "text-muted",
					children: n("Delivery Rate")
				}), /* @__PURE__ */ d("span", {
					className: "tabular-nums text-text",
					children: h(t)
				})]
			}), /* @__PURE__ */ d(o, {
				value: t,
				tone: t >= .97 ? "success" : t >= .9 ? "warning" : "danger",
				label: n("Delivery Rate")
			})] }),
			/* @__PURE__ */ f("p", {
				className: "m-0 flex flex-wrap gap-x-3 text-xs text-faint",
				children: [a.length > 0 && /* @__PURE__ */ d("span", {
					className: "text-muted",
					children: a.join(" · ")
				}), /* @__PURE__ */ d("span", { children: n("Last 7 days, updated {time}", { time: r(e.fetchedAt) }) })]
			})
		]
	});
}
function h(t) {
	return new Intl.NumberFormat(e(), {
		style: "percent",
		maximumFractionDigits: +(t < .1)
	}).format(t);
}
export { p as default };
