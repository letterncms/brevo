import { locale as e, navigate as t, t as n, timeAgo as r, useAbility as i } from "@letterncms/sdk";
import { Button as a, Meter as o, Stat as s, Widget as c, compactNumber as l } from "@letterncms/ui";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
// admin/src/WidgetStats.tsx
function f() {
	let e = i("brevo/stats", {}, { refetchInterval: 6e5 }), r = e.data, o = /* @__PURE__ */ u(a, {
		size: "sm",
		icon: "settings",
		onClick: () => t("/settings/email"),
		children: n("Open Settings")
	}), s = r?.state === "inactive" ? {
		icon: "brevo",
		title: n("Brevo is not your mail transport"),
		action: o
	} : r?.state === "no-key" ? {
		icon: "key",
		title: n("Add Your Brevo API Key"),
		action: o
	} : r?.state === "error" ? {
		icon: "warning",
		title: n("No stats from Brevo"),
		description: r.message,
		action: /* @__PURE__ */ u(a, {
			size: "sm",
			variant: "ghost",
			icon: "refresh",
			onClick: () => void e.refetch(),
			children: n("Try Again")
		})
	} : r?.state === "ok" && r.requests === 0 ? {
		icon: "brevo",
		title: n("No email sent through Brevo this week")
	} : null;
	return /* @__PURE__ */ u(c, {
		action: {
			label: n("Settings"),
			to: "/settings/email"
		},
		query: e,
		empty: s,
		children: r?.state === "ok" && /* @__PURE__ */ u(p, { s: r })
	});
}
function p({ s: e }) {
	let t = e.delivered / Math.max(1, e.requests), i = e.hardBounces + e.softBounces, a = [
		e.blocked > 0 && n("{count} blocked", { count: l(e.blocked) }),
		e.spamReports > 0 && n("{count} marked as spam", { count: l(e.spamReports) }),
		e.unsubscribed > 0 && n("{count} unsubscribed", { count: l(e.unsubscribed) })
	].filter(Boolean);
	return /* @__PURE__ */ d("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ d("div", {
				className: "grid grid-cols-2 gap-4 @md:grid-cols-4",
				children: [
					/* @__PURE__ */ u(s, {
						size: "sm",
						label: n("Delivered"),
						value: l(e.delivered)
					}),
					/* @__PURE__ */ u(s, {
						size: "sm",
						label: n("Open Rate"),
						value: m(e.opens / Math.max(1, e.delivered))
					}),
					/* @__PURE__ */ u(s, {
						size: "sm",
						label: n("Click Rate"),
						value: m(e.clicks / Math.max(1, e.delivered))
					}),
					/* @__PURE__ */ u(s, {
						size: "sm",
						label: n("Bounced"),
						value: l(i)
					})
				]
			}),
			/* @__PURE__ */ d("div", { children: [/* @__PURE__ */ d("div", {
				className: "mb-1.5 flex items-baseline justify-between text-xs",
				children: [/* @__PURE__ */ u("span", {
					className: "text-muted",
					children: n("Delivery Rate")
				}), /* @__PURE__ */ u("span", {
					className: "tabular-nums text-text",
					children: m(t)
				})]
			}), /* @__PURE__ */ u(o, {
				value: t,
				tone: t >= .97 ? "success" : t >= .9 ? "warning" : "danger",
				label: n("Delivery Rate")
			})] }),
			/* @__PURE__ */ d("p", {
				className: "m-0 flex flex-wrap gap-x-3 text-xs text-faint",
				children: [a.length > 0 && /* @__PURE__ */ u("span", {
					className: "text-muted",
					children: a.join(" · ")
				}), /* @__PURE__ */ u("span", { children: n("Last 7 days, updated {time}", { time: r(e.fetchedAt) }) })]
			})
		]
	});
}
function m(t) {
	return new Intl.NumberFormat(e(), {
		style: "percent",
		maximumFractionDigits: +(t < .1)
	}).format(t);
}
export { f as default };
