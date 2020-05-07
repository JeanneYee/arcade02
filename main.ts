namespace SpriteKind {
    export const BadFood = SpriteKind.create()
}
namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`
}
function EndGame () {
    music.magicWand.play()
    game.splash("Score:" + GameScore + "s", "High Score: " + GameHighScore + "s")
    game.reset()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    EggCount += -1
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
function CalculateHighScore () {
    GameScore = Math.round(game.runtime() / 1000)
    info.setScore(999999 - GameScore)
    if (info.highScore() < info.score()) {
        GameHighScore = GameScore
    } else {
        GameHighScore = 999999 - info.highScore()
    }
}
let GameHighScore = 0
let GameScore = 0
let Egg: Sprite = null
let RemainingEgg = 0
tiles.setTilemap(tiles.createTilemap(
            hex`1000100004040404040404040404040404040404040303030303030303030303030303040403040404040403030404040404030404030403030303030303030303040304040304030404040404040404030403040403040303030303030303030304030404030404040404030304040404040304040303030303030303030303030303040403040303040404040404030304030404030403030404040404040303040304040304030303030303030303030403040403040304040403030404040304030404030403030303030303030303040304040304040304040404040403040403040403030303030303030303030303030404040404040404040404040404040404`,
            img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . . . . . . 2 
2 . 2 2 2 2 2 . . 2 2 2 2 2 . 2 
2 . 2 . . . . . . . . . . 2 . 2 
2 . 2 . 2 2 2 2 2 2 2 2 . 2 . 2 
2 . 2 . . . . . . . . . . 2 . 2 
2 . 2 2 2 2 2 . . 2 2 2 2 2 . 2 
2 . . . . . . . . . . . . . . 2 
2 . 2 . . 2 2 2 2 2 2 . . 2 . 2 
2 . 2 . . 2 2 2 2 2 2 . . 2 . 2 
2 . 2 . . . . . . . . . . 2 . 2 
2 . 2 . 2 2 2 . . 2 2 2 . 2 . 2 
2 . 2 . . . . . . . . . . 2 . 2 
2 . 2 2 . 2 2 2 2 2 2 . 2 2 . 2 
2 . . . . . . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`,
            [myTiles.tile0,sprites.builtin.brick,sprites.builtin.crowd7,sprites.castle.tilePath5,sprites.builtin.forestTiles0,sprites.castle.tileGrass2],
            TileScale.Sixteen
        ))
scene.setBackgroundColor(1)
let Dino = sprites.create(img`
. . . . . . f f f f f f f f . . 
. . . . 4 f 7 7 7 7 7 7 7 7 f . 
. . . . 4 f 7 7 7 1 f 1 7 7 f . 
. . . . f f 7 7 7 1 f 1 7 7 f . 
. . . . 4 f 7 7 7 1 1 1 7 7 f . 
. . . 4 4 f 7 7 f 7 7 7 7 7 f . 
. . . f f 7 7 7 f f f f f f . . 
. . . 4 f 7 7 7 7 7 7 f . . . . 
. . 4 4 f 7 f 7 7 7 7 7 7 f . . 
. . f f 7 7 f 7 7 7 7 7 7 f . . 
. 4 4 f 7 7 7 7 d d 7 f . . . . 
4 f f 7 7 7 7 d d d 7 f . . . . 
f 7 7 7 7 7 7 d d d 7 f . . . . 
f f f f f 7 7 f f d 7 f . . . . 
. . . . f f f . . f f f . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
tiles.placeOnRandomTile(Dino, sprites.castle.tilePath5)
controller.moveSprite(Dino)
scene.cameraFollowSprite(Dino)
let EggCount = 50
for (let index = 0; index < EggCount; index++) {
    Egg = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . f f . . . . . . . 
. . . . . . f 5 5 f . . . . . . 
. . . . . f 5 5 5 5 f . . . . . 
. . . . . f 5 1 1 5 f . . . . . 
. . . . f 5 5 5 1 5 5 f . . . . 
. . . . f 5 5 5 5 5 5 f . . . . 
. . . . f 5 5 5 5 5 5 f . . . . 
. . . . . f 5 5 5 5 f . . . . . 
. . . . . f 5 5 5 5 f . . . . . 
. . . . . . f f f f . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Food)
    tiles.placeOnRandomTile(Egg, sprites.castle.tilePath5)
}
let GhostList = [sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . f f . . . . . . . . 
. . . . f f 1 1 f f . . . . . . 
. . . f 1 1 1 1 1 1 f . . . . . 
. . f 1 1 1 1 1 1 1 1 f . . . . 
. . f 1 1 f 1 1 f 1 1 f . . . . 
. f 1 1 1 f 1 1 f 1 1 1 f . . . 
. f 1 1 1 1 1 1 1 1 1 1 f . . . 
. f 1 1 1 2 1 2 1 2 1 1 f . f . 
. . f 1 1 2 2 2 2 2 1 1 1 f 1 f 
. . f 1 1 2 2 2 2 2 1 1 1 1 1 f 
. . . f 1 1 2 1 2 1 1 1 1 1 f . 
. . . f 1 1 1 1 1 1 1 1 1 f . . 
. . . . f 1 1 1 1 1 1 f f . . . 
. . . . . f f f f f f . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy), sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . f f . . . . . . . . 
. . . . f f 1 1 f f . . . . . . 
. . . f 1 1 1 1 1 1 f . . . . . 
. . f 1 1 1 1 1 1 1 1 f . . . . 
. . f 1 1 f 1 1 f 1 1 f . . . . 
. f 1 1 1 f 1 1 f 1 1 1 f . . . 
. f 1 1 1 1 1 1 1 1 1 1 f . . . 
. f 1 1 1 2 1 2 1 2 1 1 f . f . 
. . f 1 1 2 2 2 2 2 1 1 1 f 1 f 
. . f 1 1 2 2 2 2 2 1 1 1 1 1 f 
. . . f 1 1 2 1 2 1 1 1 1 1 f . 
. . . f 1 1 1 1 1 1 1 1 1 f . . 
. . . . f 1 1 1 1 1 1 f f . . . 
. . . . . f f f f f f . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)]
for (let value of GhostList) {
    tiles.placeOnRandomTile(value, sprites.castle.tilePath5)
    value.follow(Dino, 30)
}
game.onUpdate(function () {
    if (EggCount <= 48) {
        CalculateHighScore()
        EndGame()
    }
})
