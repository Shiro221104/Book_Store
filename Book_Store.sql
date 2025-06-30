use book_store;


Create table `book`(
`id` bigint NOT NULL AUTO_INCREMENT,
`title` varchar(255) default NULL,
`author` varchar(255) default NULL,
`description` varchar(10000) default NULL,
`genre` varchar(255) default NULL,
`category` varchar(255) default NULL,
`publisher` varchar(255) default NULL,
`image`  varchar(255) default NULL,
`quantity` bigint not null,
`trending` Boolean default false,
`price` bigint not null,
primary key(`id`)

)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) default null,
  `phone_number` varchar(50) default null,
  `email` varchar(50) NOT NULL,
  `password` varchar(120) NOT NULL,
  `username` varchar(20) NOT NULL,
  `role` enum("admin","user") DEFAULT "user",
  `address` varchar(120) DEFAULT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `Unique_username` (`username`),
  UNIQUE KEY `Unique_email` (`email`)

) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint DEFAULT NULL,
  `totalprice` int DEFAULT NULL,
 `payment_method` ENUM('CASH', 'CREDIT_CARD', 'BANK_TRANFER', 'MOBILE_PAYMENT') DEFAULT 'CASH',
 `shippingaddress` varchar(255) Not NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_id` (`user_id`),
  CONSTRAINT `FK_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    CONSTRAINT `orders_chk_1` CHECK ((`status` between 0 and 3))
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `book_order` (
 `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `book_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKawxpt1ns1sr7al76nvjkv21of` (`order_id`),
  KEY `FKdxjduvg7991r4qja26fsckxv8` (`book_id`),
  CONSTRAINT `FK_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FK_book_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
use book_store;



INSERT INTO book (title, description, genre, category, trending, image, price, author, publisher,quantity)
VALUES
('Harry Potter and the Order of the Phoenix', 'Harry Potter is about to start his fifth year at Hogwarts School of Witchcraft and Wizardry. Unlike most schoolboys, Harry never enjoys his summer holidays', 'Novel', 'Adventure', true, 'https://th.bing.com/th/id/OIP._NVzEYuOraGjk-9qYSY0LwHaK9?cb=iwp2&pid=ImgDet&w=474&h=701&rs=1', 27.99, 'J.K.Rowling', 'Scholastic',12),

('Marvel-Verse: Iron Man', 'Iron Man is one of the greatest heroes in the Marvel-Verse - and these are some of his most action-packed adventures! When the genius Tony Stark is held captive and forced to make weapons, his best chance of escape lies in building the greatest weapon of all - the very fi rst version of the Iron Man armor! Then, Shellhead meets Webhead as Iron Man and Spider-Man team up to take down the deadly Radioactive Man! And when Tony Stark makes a dramatic public return to start the next chapter of his business life, a newly-souped up Iron Man finds himself targeted for death! Finally, does Iron Man stand a ghost of a chance battling the Marvel-Verse''s most fearsome armored foe - the dastardly Doctor Doom?!', 'Comic', 'Adventure', false, 'https://images-us.bookshop.org/ingram/9781302921170.jpg?v=enc-v1', 9.99, 'Fred Van Lente, David Michelinie and Bob Layton', 'Outreach/New Reader',13),

('The Buffalo Hunter Hunter', 'A diary, written in 1912 by a Lutheran pastor is discovered within a wall. What it unveils is a slow massacre, a chain of events that go back to 217 Blackfeet dead in the snow. Told in transcribed interviews by a Blackfeet named Good Stab, who shares the narrative of his peculiar life over a series of confessional visits. This is an American Indian revenge story written by one of the new masters of horror, Stephen Graham Jones.', 'Fiction', 'Horror', true, 'https://images-us.bookshop.org/ingram/9781668075081.jpg?v=e0b436983a5453e2b04f5fe3899a7913', 27.89, 'Stephen Graham Jones', 'S&S/Saga Press',10),

('An Illustrated Treasury of Grimm''s Fairy Tales', 'Two hundred years ago, the Brothers Grimm published their famous collection of folk tales, including these thirty much-loved stories of helpful elves; giants who can see into the next land; foolish but good-hearted lads; princesses with golden hair; faithful servants and wicked queens. This sumptuously illustrated collection of essential Grimm classics includes stories every childhood needs: The Princess and the Frog, Little Red Riding Hood, Sleeping Beauty, Cinderella, Rumpelstiltskin and dozens more. Each tale is brought to life with radiant, faithful pictures from Daniela Drescher, one of Germany''s best-loved illustrators, which are sure to fire any child''s imagination.', 'Fairy Tales', 'Fantasy', false, 'https://images-us.bookshop.org/ingram/9780863159473.jpg?v=enc-v1', 23.20, 'Jacob and Wilhelm Grimm', 'Floris Books',14),

('Romeo and Juliet', 'In Romeo and Juliet, Shakespeare creates a violent world, in which two young people fall in love. It is not simply that their families disapprove; the Montagues and the Capulets are engaged in a blood feud.  In this death-filled setting, the movement from love at first sight to the lovers’ final union in death seems almost inevitable. And yet, this play set in an extraordinary world has become the quintessential story of young love. In part because of its exquisite language, it is easy to respond as if it were about all young lovers.', 'Fiction', 'Romance', true, 'https://images-us.bookshop.org/ingram/9780743477116.jpg?v=enc-v1', 6.99, 'William Shakespeare', 'Simon & Schuster',15),

('The Missing Half', 'At 24, Nicole “Nic” Monroe is stuck — living alone in Mishawaka, Indiana, working a dead-end job, and reeling from a recent DWI. For the past seven years, her life’s been defined by one tragedy: the unexplained disappearance of her older sister, Kasey. The only clue was Kasey’s abandoned car, eerily similar to the case of Jules Connor, who vanished two weeks earlier. Both cases went cold. Nic has given up hope — until Jenna Connor, Jules’s sister, shows up with new determination. Together, the two women reignite the search for answers, setting off a gripping journey that could uncover the truth—or destroy everything they know.', 'Novel', 'Mystery', false, 'https://images-us.bookshop.org/ingram/9780593726983.jpg?v=enc-v1', 30.00, 'Ashley Flowers', 'Bantam',20),

('The Garden of Words', 'On rainy mornings, Takao can never bring him-self to go to school--instead, he spends that time at the beautiful Shinjuku Gyoen gardens and finds a brief reprieve from everything else in his life among the trees and flowers. And on one of those mornings, he discovers a mysterious woman named Yukino in his haven, skipping work, and an unlikely friendship blooms between them. But though these two are the center of this story, they are far from the only ones trying to find their way in life. From director Makoto Shinkai comes a deeper look at his award-winning 2013 film, The Garden of Words, full of additional scenes and perspectives to show a whole new side of the many characters who brought the film to life.', 'Manga', 'Fantasy', true, 'https://images-us.bookshop.org/ingram/9781975315672.jpg?v=120c4c94cc62dee20270d141a4e2abbd', 20.00, 'Makoto Shinkai', 'Yen on',23),

('Your Name', 'Mitsuha, a high school girl living in a small town in the mountains, has a dream that she''s a boy living in Tokyo. Taki, a high school boy in Tokyo, dreams he''s a girl living in a quaint little mountain town. Sharing bodies, relationships, and lives, the two become inextricably interwoven--but are any connections truly inseverable in the grand tapestry of fate?Written by director MAKOTO SHINKAI during the production of the film by the same title, your name. is in turns funny, heartwarming, and heart-wrenching as it follows the struggles of two young people determined to hold on to one another.', 'Manga', 'Romance', true, 'https://images-us.bookshop.org/ingram/9780316471862.jpg?v=enc-v1', 20.00, 'Makoto Shinkai', 'Yen on',22);



