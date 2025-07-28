import pygame
import sys
import time

pygame.init()

WIDTH, HEIGHT = 1000, 1000
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Math Idle Game")

font = pygame.font.SysFont("consolas", 32)

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (50, 50, 50)
GREEN = (0, 200, 0)
RED = (200, 0, 0)

clock = pygame.time.Clock()

# Game state
idle_total = 0
idle_per_sec = 0
last_update = time.time()

tile_size = 60


# Pools with counts
number_pool = [{'value' : '0', 'count':1}, {'value': '1', 'count': 1}]
symbol_pool = [{'value': '+', 'count': 1}]

# Dragging state
dragging_tile = None  # Tuple: ('number'/'symbol', index)
drag_offset = (0, 0)

def draw_tile(rect, text, count, color=GRAY):
    pygame.draw.rect(screen, color, rect)
    pygame.draw.rect(screen, WHITE, rect, 2)
    txt_surf = font.render(text, True, WHITE)
    count_surf = font.render(str(count), True, RED)
    screen.blit(txt_surf, (rect.x + 10, rect.y + 5))
    screen.blit(count_surf, (rect.right - 20, rect.bottom - 25))

def get_expression_value():
    expr = ["**" if tile == "^" else tile for tile in expression_slots if tile is not None]
    has_symbol=False
    symbol_list = ["**" if symbol['value']=="^" else symbol['value'] for symbol in symbol_pool]
    for symbol in symbol_list:
        if symbol in expr: 
            has_symbol=True
            break
    if has_symbol:
        try:
            if expr[0]=="+" or expr[0]=="-":
                return "Starting symbol not allowed."
            return eval("".join(expr))
        except:
            return "Error in Equation"
    else:
        return "Must have one symbol"

def add_to_pool(pool,value):
    done=False
    for tile in pool:
        if tile['value'] == value:
            tile['count'] +=1
            done=True
            break
    if not done:
        pool.append({'value':value,'count':1})

def add_expression_slot(num):
    global slot_rects
    for _ in range(num):
        expression_slots.append(None)
    slot_rects = [pygame.Rect(10 + i * tile_size, 100, tile_size, tile_size) for i in range(len(expression_slots))]

expression_slots = []
add_expression_slot(3)

def mult_cost(upg,mult):
    upgrade['cost']= int(upgrade['cost']*mult*upgrade['times'])

upgrade_rects = []
upgrade_tabs = ['Numbers', 'Symbols', 'Extra']
active_tab = 'Numbers'
upgrades = [
    {'label': "+1 '1'", 'cost': 10, 'action': lambda u=None:(add_to_pool(number_pool, '1'),mult_cost(u,-10)), 'pop': False, 'times':0,'category': 'Numbers'},
    {'label': "+1 '2'", 'cost': 50, 'action': lambda u=None:(add_to_pool(number_pool, '2'),mult_cost(u,-20)), 'pop': False, 'times':0,'category': 'Numbers'},
    {'label': "+1 '3'", 'cost': -350, 'action': lambda u=None:(add_to_pool(number_pool, '3'),mult_cost(u,-30)), 'pop': False, 'times':0,'category': 'Numbers'},
    {'label': "+1 '4'", 'cost': 1000, 'action': lambda u=None:(add_to_pool(number_pool, '4'),mult_cost(u,-40)), 'pop': False, 'times':0,'category': 'Numbers'},
    {'label': "+1 '5'", 'cost': 5000, 'action': lambda u=None:(add_to_pool(number_pool, '5'),mult_cost(u,-50)), 'pop': False, 'times':0,'category': 'Numbers'},
    {'label': "+1 '6'", 'cost': -35000, 'action': lambda u=None:(add_to_pool(number_pool, '6'),mult_cost(u,-60)), 'pop': False, 'times':0,'category': 'Numbers'},
    {'label': "+1 '7'", 'cost': 100000, 'action': lambda u=None:(add_to_pool(number_pool, '7'),mult_cost(u,-70)), 'pop': False, 'times':0,'category': 'Numbers'},
    {'label': "+1 '8'", 'cost': 500000, 'action': lambda u=None:(add_to_pool(number_pool, '8'),mult_cost(u,-80)), 'pop': False, 'times':0,'category': 'Numbers'},
    {'label': "+1 '9'", 'cost': -3500000, 'action': lambda u=None:(add_to_pool(number_pool, '9'),mult_cost(u,-90)), 'pop': False, 'times':0,'category': 'Numbers'},
    {'label': "+1 '0'", 'cost': -100000000, 'action': lambda u=None:(add_to_pool(number_pool, '0'),mult_cost(u,-100)), 'pop': False, 'times':0,'category': 'Numbers'},
    
    {'label': "+1 '+'", 'cost': 15, 'action': lambda u=None:(add_to_pool(symbol_pool, '+'),mult_cost(u,-50)), 'pop': False, 'times':0,'category': 'Symbols'},
    {'label': "+1 '-'", 'cost': 15, 'action': lambda u=None:(add_to_pool(symbol_pool, '-'),mult_cost(u,-50)), 'pop': False, 'times':0,'category': 'Symbols'},
    {'label': "+1 '*'", 'cost': 10000, 'action': lambda u=None:(add_to_pool(symbol_pool, '*'),mult_cost(u,-500)), 'pop': False, 'times':0,'category': 'Symbols'},
    {'label': "+1 '/'", 'cost': 10000, 'action': lambda u=None:(add_to_pool(symbol_pool, '/'),mult_cost(u,-500)), 'pop': False, 'times':0,'category': 'Symbols'},
    {'label': "+1 '('", 'cost': 1500, 'action': lambda u=None:(add_to_pool(symbol_pool, '('),mult_cost(u,-500)), 'pop': False, 'times':0,'category': 'Symbols'},
    {'label': "+1 ')'", 'cost': 1500, 'action': lambda u=None:(add_to_pool(symbol_pool, ')'),mult_cost(u,-500)), 'pop': False, 'times':0,'category': 'Symbols'},
    {'label': "+1 '^'", 'cost': 1000000, 'action': lambda u=None:(add_to_pool(symbol_pool, '^'),mult_cost(u,-50000)), 'pop': False, 'times':0,'category': 'Symbols'},
    
    {'label': "+1 Slot", 'cost': 100, 'action': lambda u=None:(add_expression_slot(1),mult_cost(u,-1000)), 'pop': False, 'times':0,'category': 'Extra'}
]

while True:
    screen.fill(BLACK)

    # Idle gain
    now = time.time()
    if isinstance(idle_per_sec, (int, float)) and now - last_update >= 1:
        idle_total += idle_per_sec
        last_update = now

    # Event handling
    filtered_upgrades = [u for u in upgrades if u['category'] == active_tab]
    
    for event in pygame.event.get():
        
        
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

        
        elif event.type == pygame.MOUSEBUTTONDOWN:
            pos = event.pos
            # Check number pool
            if event.button==1:
                #check number pool
                for i, rect in enumerate([pygame.Rect(100 + i * 70, 400, tile_size, tile_size) for i in range(len(number_pool))]):
                    if rect.collidepoint(pos) and number_pool[i]['count'] > 0:
                        dragging_tile = ('number', i)
                        drag_offset = (pos[0] - rect.x, pos[1] - rect.y)
                        click_time = time.time()
                # Check symbol pool
                for i, rect in enumerate([pygame.Rect(100 + i * 70, 480, tile_size, tile_size) for i in range(len(symbol_pool))]):
                    if rect.collidepoint(pos) and symbol_pool[i]['count'] > 0:
                        dragging_tile = ('symbol', i)
                        drag_offset = (pos[0] - rect.x, pos[1] - rect.y)
                        click_time = time.time()
                #check upgrades
                for i, rect in enumerate(upgrade_rects):
                    if rect.collidepoint(pos):
                        upgrade = filtered_upgrades[i]
                        bought=False
                        if upgrade['cost']>=0 and idle_total >= upgrade['cost']:
                            idle_total -= upgrade['cost']
                            bought=True
                        elif upgrade['cost']<=0 and idle_total <= upgrade['cost']:
                            idle_total -= upgrade['cost']
                            bought=True
                        if bought:
                            upgrade['times']+=1
                            upgrade['action'](upgrade)
                            if upgrade['pop']:
                                upgrades.pop(upgrades.index(upgrade))
                # Check tab clicks
                for i, tab in enumerate(upgrade_tabs):
                    tab_rect = pygame.Rect(WIDTH - 240 + i * tab_width, 60, tab_width - 10, 30)
                    if tab_rect.collidepoint(pos):
                        active_tab = tab
                
            elif event.button==3: #right click
                for i, rect in enumerate(slot_rects):
                    if rect.collidepoint(pos):
                        value = expression_slots[i]
                        if value is not None:
                            
                            for tile in number_pool:
                                if tile['value']==value:
                                    tile['count']+=1
                                    break
                            for tile in symbol_pool:
                                if tile['value']==value:
                                    tile['count']+=1
                                    break
                            expression_slots[i]=None
                            idle_per_sec=get_expression_value()

        elif event.type == pygame.MOUSEBUTTONUP:
            if dragging_tile is not None:
                if None in expression_slots and time.time()-click_time<0.5:
                    pool_type, index = dragging_tile
                    tile = number_pool[index] if pool_type == 'number' else symbol_pool[index]
                    expression_slots[expression_slots.index(None)] = tile['value']
                    tile['count'] -= 1
                else:
                    pos = event.pos
                    for i, rect in enumerate(slot_rects):
                        if rect.collidepoint(pos):
                            pool_type, index = dragging_tile
                            if expression_slots[i] is None:
                                tile = number_pool[index] if pool_type == 'number' else symbol_pool[index]
                                expression_slots[i] = tile['value']
                                tile['count'] -= 1
                            break
                dragging_tile = None
                idle_per_sec = get_expression_value()

    # Draw expression slots
    for i, rect in enumerate(slot_rects):
        pygame.draw.rect(screen, WHITE, rect, 2)
        if expression_slots[i]:
            draw_tile(rect, expression_slots[i], "", color=GREEN)

    # Draw number pool
    for i, tile in enumerate(number_pool):
        rect = pygame.Rect(100 + i * 70, 400, tile_size, tile_size)
        draw_tile(rect, tile['value'], tile['count'])

    # Draw symbol pool
    for i, tile in enumerate(symbol_pool):
        rect = pygame.Rect(100 + i * 70, 480, tile_size, tile_size)
        draw_tile(rect, tile['value'], tile['count'])

    # Draw upgrade bar background
    pygame.draw.rect(screen, (30, 30, 30), (WIDTH - 250, 0, 250, HEIGHT))
    screen.blit(font.render("Upgrades", True, WHITE), (WIDTH - 200, 30))

    # Draw tab buttons
    tab_width = 80
    for i, tab in enumerate(upgrade_tabs):
        tab_rect = pygame.Rect(WIDTH - 240 + i * tab_width, 60, tab_width - 10, 30)
        pygame.draw.rect(screen, (70, 70, 70) if tab != active_tab else (120, 120, 120), tab_rect)
        pygame.draw.rect(screen, WHITE, tab_rect, 2)
        tab_label = font.render(tab[:3], True, WHITE)
        screen.blit(tab_label, (tab_rect.x + 5, tab_rect.y + 2))

    # Filter upgrades by active tab
    upgrade_rects = []

    for i in range(len(filtered_upgrades)):
        upgrade_rects.append(pygame.Rect(WIDTH - 230, 100 + i * 80, 200, 60))

    for i, rect in enumerate(upgrade_rects):
        pygame.draw.rect(screen, (70, 70, 70), rect)
        pygame.draw.rect(screen, WHITE, rect, 2)
        upgrade = filtered_upgrades[i]
        screen.blit(font.render(upgrade['label'], True, WHITE), (rect.x + 10, rect.y + 5))
        screen.blit(font.render(f"${upgrade['cost']}", True, GREEN), (rect.x + 10, rect.y + 30))
    
    # Draw dragging tile
    if dragging_tile is not None:
        mx, my = pygame.mouse.get_pos()
        drag_rect = pygame.Rect(mx - drag_offset[0], my - drag_offset[1], tile_size, tile_size)
        pool_type, index = dragging_tile
        tile = number_pool[index] if pool_type == 'number' else symbol_pool[index]
        draw_tile(drag_rect, tile['value'], "", color=GREEN)

    # UI text
    expr_text = "Expression: " + " ".join([tile for tile in expression_slots if tile is not None])
    screen.blit(font.render(expr_text, True, WHITE), (50, 20))
    screen.blit(font.render(f"Idle/s: {idle_per_sec}", True, GREEN), (50, 300))
    screen.blit(font.render(f"Total: {int(idle_total)}", True, GREEN), (50, 340))

    pygame.display.flip()
    clock.tick(60)
