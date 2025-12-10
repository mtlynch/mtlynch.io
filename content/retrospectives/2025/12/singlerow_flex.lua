-- Single Row Flex Layout
-- Arranges all windows in a single horizontal row with adjustable widths
-- Users can expand/shrink the focused client's width using hotkeys

local awful = require("awful")
local gears = require("gears")

local singlerow_flex = {}

singlerow_flex.name = "singlerow_flex"

-- Store width factors per tag
-- Structure: factors[tag][client] = factor (default 1.0)
local factors = setmetatable({}, { __mode = "k" })

-- Get or initialize factors for a tag
local function get_tag_factors(tag)
    if not factors[tag] then
        factors[tag] = setmetatable({}, { __mode = "k" })
    end
    return factors[tag]
end

-- Get factor for a client (default 1.0)
local function get_client_factor(tag, client)
    local tag_factors = get_tag_factors(tag)
    return tag_factors[client] or 1.0
end

-- Set factor for a client
local function set_client_factor(tag, client, factor)
    local tag_factors = get_tag_factors(tag)
    tag_factors[client] = math.max(0.2, factor) -- Minimum factor of 0.2
end

-- Increase focused client's width factor
function singlerow_flex.incfactor(increment)
    local c = client.focus
    if not c then return end

    local tag = c.screen.selected_tag
    if not tag then return end

    local current_factor = get_client_factor(tag, c)
    set_client_factor(tag, c, current_factor + increment)

    awful.layout.arrange(c.screen)
end

-- Reset all factors to 1.0 for current tag
function singlerow_flex.resetfactors()
    local screen = awful.screen.focused()
    if not screen then return end

    local tag = screen.selected_tag
    if not tag then return end

    factors[tag] = setmetatable({}, { __mode = "k" })

    awful.layout.arrange(screen)
end

function singlerow_flex.arrange(p)
    local area = p.workarea
    local t = p.tag or screen[p.screen].selected_tag
    local clients = p.clients

    if #clients == 0 then return end

    local useless_gap = p.useless_gap or 0

    -- Reverse client order so new windows appear on the right
    local reversed_clients = {}
    for i = #clients, 1, -1 do
        table.insert(reversed_clients, clients[i])
    end

    -- Calculate available width (minus gaps)
    local available_width = area.width - (useless_gap * (#clients + 1))

    -- Base width: 25% for 4 or fewer clients, equal division for more
    -- This ensures new windows shrink existing ones to fit at 25% width
    local divisor = math.max(4, #clients)
    local base_width = available_width / divisor

    -- Calculate actual widths based on factors, capping to remaining space
    -- Each window's width = base_width * factor (default factor is 1.0)
    local widths = {}
    local remaining_space = available_width

    for _, c in ipairs(reversed_clients) do
        local factor = get_client_factor(t, c)
        local target_width = base_width * factor

        -- Cap width to remaining space to prevent overflow
        local actual_width = math.floor(math.min(target_width, remaining_space))
        widths[c] = actual_width
        remaining_space = remaining_space - actual_width
    end

    -- Position each window
    local current_x = area.x + useless_gap

    for _, c in ipairs(reversed_clients) do
        local window_width = widths[c]

        local g = {
            x = current_x,
            y = area.y + useless_gap,
            width = window_width,
            height = area.height - 2 * useless_gap
        }

        p.geometries[c] = g
        current_x = current_x + window_width + useless_gap
    end
end

return singlerow_flex
